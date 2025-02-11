create database tienda;

\c tienda;

-- Tabla de usuarios
create table usuarios (
    id_usuario serial primary key,
    nombre varchar(255),
    password varchar(255),
    fecha_crea date,
    correo varchar(255) unique
);

-- Tabla de categorías
create table categorias (
    id_categoria serial primary key,
    nombre varchar(255)
);

-- Tabla de productos
create table productos (
    id_producto serial primary key,
    sku varchar(255) unique,
    descripcion varchar(255),
    precio integer,
    stock integer,
    nombre varchar(255),
    fecha_crea date,
    id_categoria integer references categorias(id_categoria) on delete cascade,
    id_usuario integer references usuarios(id_usuario) on delete cascade
);

-- Tabla de publicaciones
create table publicaciones (
    id_publicacion serial primary key,
    titulo varchar(255),
    descripcion varchar(255),
    precio integer,
    fecha_crea date,
    id_usuario integer references usuarios(id_usuario) on delete cascade,
    id_categoria integer references categorias(id_categoria) on delete cascade
);

-- Tabla de carritos
create table carritos (
    id_carrito serial primary key,
    cantidad integer,
    id_usuario integer references usuarios(id_usuario) on delete cascade,
    id_producto integer references productos(id_producto) on delete cascade
);

-- Tabla de pedidos
create table pedidos (
    id_pedido serial primary key,
    estado varchar(255),
    precio_total integer,
    fecha_crea date,
    id_usuario integer references usuarios(id_usuario) on delete cascade
);

-- Tabla de detalles de pedidos
create table detalles (
    id_detalle serial primary key,
    cantidad integer,
    precio integer,
    id_pedido integer references pedidos(id_pedido) on delete cascade,
    id_producto integer references productos(id_producto) on delete cascade
);
