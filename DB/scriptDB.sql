-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-05-2025 a las 19:55:27
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `daw_proyecto_gym_ant`
--
CREATE DATABASE IF NOT EXISTS `daw_proyecto_gym_ant` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `daw_proyecto_gym_ant`;

-- --------------------------------------------------------

-- Eliminar tablas en orden inverso a las dependencias
DROP TABLE IF EXISTS `progresos`;
DROP TABLE IF EXISTS `detalles_plan`;
DROP TABLE IF EXISTS `planes_entrenamiento`;
DROP TABLE IF EXISTS `ejercicios`;
DROP TABLE IF EXISTS `usuarios`;


--
-- Estructura de tabla para la tabla `detalles_plan`
--

CREATE TABLE IF NOT EXISTS `detalles_plan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_plan` int(11) NOT NULL,
  `id_ejercicio` int(11) NOT NULL,
  `dia_semana` enum('Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo') NOT NULL,
  `series` int(11) NOT NULL,
  `repeticiones` int(11) NOT NULL,
  `descanso` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_plan_ejercicio_dia` (`id_plan`,`id_ejercicio`,`dia_semana`),
  KEY `detalles_plan_ibfk_2` (`id_ejercicio`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalles_plan`
--

INSERT INTO `detalles_plan` (`id`, `id_plan`, `id_ejercicio`, `dia_semana`, `series`, `repeticiones`, `descanso`) VALUES
(1, 28, 24, 'Jueves', 4, 4, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ejercicios`
--

CREATE TABLE IF NOT EXISTS `ejercicios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `categoria` varchar(50) DEFAULT NULL,
  `grupo_muscular` varchar(50) DEFAULT NULL,
  `nivel` varchar(50) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `imagen` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_ejercicio` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ejercicios`
--

INSERT INTO `ejercicios` (`id`, `nombre`, `categoria`, `grupo_muscular`, `nivel`, `descripcion`, `imagen`) VALUES
(1, 'Sentadillas', 'Fuerza', 'Pierna', 'Otro', 'Ejercicio para fortalecer glúteos y piernas. Ejercicio básico.', 'imagen-1747586282060.png'),
(24, 'Press de banca', 'Fuerza', 'Pectorales', 'Intermedio', 'Ejercicio clásico para el pecho', 'imagen-1746352166054.png'),
(25, 'Flexiones', 'Fuerza', 'Espalda', 'Principiante', 'Trabajo de dorsales y brazos', 'imagen-1746352172679.png'),
(26, 'Dominadas', 'Fuerza', 'Espalda, Abdomen', 'Avanzado', 'Ejercicio completo ', 'imagen-1746352003386.png'),
(27, 'Press Militar', 'Fuerza', 'Hombros', 'Intermedio', 'Ejercicio básico para hombros', 'imagen-1746352383304.png'),
(30, 'Prensa', 'Fuerza', 'Pierna', 'Básico', '', 'imagen-1747586539764.png'),
(31, 'Jalón al pecho', 'Fuerza', 'Dorsal', 'Medio', '', 'imagen-1748163678750.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planes_entrenamiento`
--

CREATE TABLE IF NOT EXISTS `planes_entrenamiento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_entrenador` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `plan` varchar(100) NOT NULL,
  `nivel` enum('Principiante','Intermedio','Avanzado') DEFAULT NULL,
  `createdDate` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedDate` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_PLAN` (`id_entrenador`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `planes_entrenamiento`
--

INSERT INTO `planes_entrenamiento` (`id`, `id_entrenador`, `id_usuario`, `plan`, `nivel`, `createdDate`, `modifiedDate`) VALUES
(28, 16, 22, 'Plan Inicial Jose', 'Principiante', '2025-05-31 19:22:26', '2025-05-31 19:22:26'),
(29, 16, 31, 'Plan Inicial a', 'Principiante', '2025-05-18 19:40:53', '2025-05-18 19:40:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `progresos`
--

CREATE TABLE IF NOT EXISTS `progresos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(100) DEFAULT NULL,
  `id_plan` int(11) NOT NULL,
  `nombre_plan` varchar(100) DEFAULT NULL,
  `fecha` date NOT NULL,
  `peso` decimal(5,2) DEFAULT NULL,
  `IMC` decimal(6,2) NOT NULL,
  `indice_grasa` decimal(10,0) NOT NULL,
  `observaciones` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_plan` (`id_plan`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `progresos`
--

INSERT INTO `progresos` (`id`, `id_usuario`, `nombre_usuario`, `id_plan`, `nombre_plan`, `fecha`, `peso`, `IMC`, `indice_grasa`, `observaciones`) VALUES
(23, 22, 'Jose', 28, 'Plan Inicial Jose', '2025-05-30', 62.00, 22.00, 21, ''),
(26, 22, 'Jose', 29, 'Plan Inicial a', '2025-05-31', 68.00, 24.00, 24, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL,
  `altura` float NOT NULL,
  `peso` float NOT NULL,
  `edad` int(11) NOT NULL,
  `sexo` enum('Hombre','Mujer','Otro') NOT NULL,
  `rol` enum('ADMIN','ENTRENADOR','USUARIO') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellidos`, `email`, `password`, `altura`, `peso`, `edad`, `sexo`, `rol`) VALUES
(16, 'Mari', 'Montaña', 'mar@coach.es', '$2b$12$WKS7TbLEp56RYe4qes9L2.H7BAA8IXykteXCuE1aa3W5cP2sM0BQC', 1.6, 50, 32, 'Mujer', 'ENTRENADOR'),
(22, 'Jose', 'Ruiz', 'jose@email.es', '$2b$12$9hqMG9mLGLa540rgTKalA.o0Fc53NOfdTGFqHIW0sd7hUDZnSR8rW', 1.7, 72, 30, 'Hombre', 'USUARIO'),
(28, 'Antonio', 'Martínez', 'ant@admin.com', '$2b$12$nA1fGyJdVHOmPFFyS9H1m.88uv5O3e55faA8NR.9pcnYfoSPl4Pzu', 1.7, 63, 36, 'Hombre', 'ADMIN');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalles_plan`
--
ALTER TABLE `detalles_plan`
  ADD CONSTRAINT `detalles_plan_ibfk_1` FOREIGN KEY (`id_plan`) REFERENCES `planes_entrenamiento` (`id`),
  ADD CONSTRAINT `detalles_plan_ibfk_2` FOREIGN KEY (`id_ejercicio`) REFERENCES `ejercicios` (`id`);

--
-- Filtros para la tabla `planes_entrenamiento`
--
ALTER TABLE `planes_entrenamiento`
  ADD CONSTRAINT `FK_PLAN` FOREIGN KEY (`id_entrenador`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `progresos`
--
ALTER TABLE `progresos`
  ADD CONSTRAINT `progresos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `progresos_ibfk_2` FOREIGN KEY (`id_plan`) REFERENCES `planes_entrenamiento` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
