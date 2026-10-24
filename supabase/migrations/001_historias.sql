-- =============================================================================
-- Mural "Histórias com a gente" — Ilma & Ruy
-- Cole este arquivo inteiro no Supabase: SQL Editor → New query → Run.
-- Pode rodar mais de uma vez sem problema.
--
-- Regras de segurança (RLS):
--   • o público (anon) só ENVIA histórias, e elas entram sempre como não aprovadas;
--   • o público só LÊ histórias aprovadas;
--   • ninguém de fora edita ou apaga (não existe política de update/delete).
-- Moderação: no Table Editor, tabela "historias", marque "aprovada" = true.
-- =============================================================================

create table if not exists public.historias (
  id         uuid        primary key default gen_random_uuid(),
  criado_em  timestamptz not null default now(),
  nome       text        not null check (char_length(btrim(nome)) between 1 and 80),
  texto      text        not null check (char_length(btrim(texto)) between 1 and 1000),
  foto_path  text        check (foto_path is null or foto_path ~ '^[0-9a-f-]{36}\.(jpg|jpeg|png|webp)$'),
  aprovada   boolean     not null default false
);

create index if not exists historias_aprovadas_idx
  on public.historias (criado_em desc) where aprovada;

alter table public.historias enable row level security;

-- Permissões por coluna: o público só escreve nome, texto e foto
-- (id, data e "aprovada" ficam com os valores padrão).
revoke all on table public.historias from anon, authenticated;
grant insert (nome, texto, foto_path) on table public.historias to anon, authenticated;
grant select (id, criado_em, nome, texto, foto_path, aprovada) on table public.historias to anon, authenticated;

drop policy if exists "publico envia historia nao aprovada" on public.historias;
create policy "publico envia historia nao aprovada"
  on public.historias for insert
  to anon, authenticated
  with check (aprovada = false);

drop policy if exists "publico le historias aprovadas" on public.historias;
create policy "publico le historias aprovadas"
  on public.historias for select
  to anon, authenticated
  using (aprovada = true);

-- -----------------------------------------------------------------------------
-- Fotos: bucket "historias" no Storage
--   • público para LEITURA pelo caminho da foto (link direto), sem listagem;
--   • o público só pode ENVIAR imagens jpg/png/webp de até 5 MB;
--   • sem sobrescrever, editar ou apagar.
-- -----------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('historias', 'historias', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "publico envia foto de historia" on storage.objects;
create policy "publico envia foto de historia"
  on storage.objects for insert
  to anon, authenticated
  with check (
    bucket_id = 'historias'
    and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp')
    and name ~ '^[0-9a-f-]{36}\.(jpg|jpeg|png|webp)$'
  );
