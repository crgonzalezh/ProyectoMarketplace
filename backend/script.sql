CREATE DATABASE tienda;

\c tienda;

-- Tabla de Usuarios
CREATE TABLE Usuarios (
    idUsuario SERIAL PRIMARY KEY,
    nombre VARCHAR(255),
    password VARCHAR(255),
    fechaCrea DATE,
    correo VARCHAR(255) UNIQUE
);

-- Tabla de Categorías
CREATE TABLE Categorias (
    idCategoria SERIAL PRIMARY KEY,
    nombre VARCHAR(255)
);

-- Tabla de Productos
CREATE TABLE Productos (
    idProducto SERIAL PRIMARY KEY,
    sku VARCHAR(255) UNIQUE,
    descripcion VARCHAR(255),
    precio INTEGER,
    stock INTEGER,
    nombre VARCHAR(255),
    fechaCrea DATE,
    idCategoria INTEGER REFERENCES Categorias(idCategoria) ON DELETE CASCADE,
    idUsuario INTEGER REFERENCES Usuarios(idUsuario) ON DELETE CASCADE
);

-- Tabla de Publicaciones
CREATE TABLE Publicaciones (
    idPublicacion SERIAL PRIMARY KEY,
    titulo VARCHAR(255),
    descripcion VARCHAR(255),
    precio INTEGER,
    fechaCrea DATE,
    idUsuario INTEGER REFERENCES Usuarios(idUsuario) ON DELETE CASCADE,
    idCategoria INTEGER REFERENCES Categorias(idCategoria) ON DELETE CASCADE
);

-- Tabla de Carritos
CREATE TABLE Carritos (
    idCarrito SERIAL PRIMARY KEY,
    cantidad INTEGER,
    idUsuario INTEGER REFERENCES Usuarios(idUsuario) ON DELETE CASCADE,
    idProducto INTEGER REFERENCES Productos(idProducto) ON DELETE CASCADE
);

-- Tabla de Pedidos
CREATE TABLE Pedidos (
    idPedido SERIAL PRIMARY KEY,
    estado VARCHAR(255),
    precioTotal INTEGER,
    fechaCrea DATE,
    idUsuario INTEGER REFERENCES Usuarios(idUsuario) ON DELETE CASCADE
);

-- Tabla de Detalles de Pedidos
CREATE TABLE Detalles (
    idDetalle SERIAL PRIMARY KEY,
    cantidad INTEGER,
    precio INTEGER,
    idPedido INTEGER REFERENCES Pedidos(idPedido) ON DELETE CASCADE,
    idProducto INTEGER REFERENCES Productos(idProducto) ON DELETE CASCADE
);
