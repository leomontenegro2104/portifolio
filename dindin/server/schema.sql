drop table if exists transacoes;
drop table if exists usuarios;
drop table if exists categorias;

create table if not exists usuarios(
  id serial primary key,
  nome text not null,
  email text not null unique,
  senha text not null
);

create table if not exists categorias(
  id serial primary key,
  descricao text not null
);

create type tipo as enum('Entrada', 'Saida');

create table if not exists transacoes(
  id serial primary key,
  descricao text,
  valor int not null,
  data date not null default CURRENT_DATE,
  categoria_id int not null references categorias(id),
  usuarios_id int not null references usuarios(id),
  tipo tipo not null
);

insert into categorias(descricao) values('Alimentação'),
('Assinaturas e Serviços'),
('Casa'),
('Mercado'),
('Cuidados Pessoais'),
('Educação'),
('Família'),
('Lazer'),
('Pets'),
('Presentes'),
('Roupas'),
('Saúde'),
('Transporte'),
('Salário'),
('Vendas'),
('Outras receitas'),
('Outras despesas')
