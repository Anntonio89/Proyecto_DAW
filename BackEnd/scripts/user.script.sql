--
-- Base de datos: `daw_proyecto_gym_ant`
--
CREATE DATABASE IF NOT EXISTS `daw_proyecto_gym_ant` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `daw_proyecto_gym_ant`;

-- ----------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `nombre` varchar(100) NOT NULL,
    `apellidos` varchar(100) NOT NULL,
    `email` varchar(100) NOT NULL,
    `password` varchar(500) NOT NULL,
    `altura` FLOAT NOT NULL,
    `peso` FLOAT NOT NULL,
    `edad` INT(11) NOT NULL,
    `sexo` ENUM('Hombre','Mujer','Otro') NOT NULL,
    `rol` ENUM('Admin','Entrenador','Usuario','Invitado') NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- ----------------------------------------------------
--
-- Inserción de datos de prueba
--

INSERT INTO `usuarios` (`nombre`, `apellidos`, `email`, `password`, `altura`, `peso`, `edad`, `sexo`, `rol`) VALUES
('Juan', 'Pérez', 'juan@example.com', 'password1', 1.75, 70, 30, 'Hombre', 'Usuario'),
('María', 'López', 'maria@example.com', 'password2', 1.60, 55, 25, 'Mujer', 'Entrenador'),
('Carlos', 'Gómez', 'carlos@example.com', 'password3', 1.80, 80, 35, 'Hombre', 'Admin');
