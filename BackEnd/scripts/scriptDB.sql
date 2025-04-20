-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-04-2025 a las 09:10:05
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
  KEY `id_plan` (`id_plan`),
  KEY `id_ejercicio` (`id_ejercicio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `detalles_plan`
--

TRUNCATE TABLE `detalles_plan`;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `ejercicios`
--

TRUNCATE TABLE `ejercicios`;
--
-- Volcado de datos para la tabla `ejercicios`
--

INSERT INTO `ejercicios` (`id`, `nombre`, `categoria`, `grupo_muscular`, `nivel`, `descripcion`, `imagen`) VALUES
(1, 'Sentadillas', 'Fuerza', 'Pierna', 'Principiante', 'Ejercicio para fortalecer piernas y glúteos', 'squat-800.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planes_entrenamiento`
--

CREATE TABLE IF NOT EXISTS `planes_entrenamiento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_entrenador` int(11) NOT NULL,
  `plan` varchar(100) NOT NULL,
  `nivel` enum('Principiante','Intermedio','Avanzado') DEFAULT NULL,
  `createdDate` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedDate` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_PLAN` (`id_entrenador`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `planes_entrenamiento`
--

TRUNCATE TABLE `planes_entrenamiento`;
--
-- Volcado de datos para la tabla `planes_entrenamiento`
--

INSERT INTO `planes_entrenamiento` (`id`, `id_entrenador`, `plan`, `nivel`, `createdDate`, `modifiedDate`) VALUES
(8, 16, 'Plan de Fuerza', 'Avanzado', '2025-03-30 18:23:30', '2025-04-18 21:03:12'),
(9, 16, 'Plan de Resistencia', 'Intermedio', '2025-03-30 18:23:30', '2025-04-18 21:03:24'),
(10, 16, 'Plan para Principiantes', 'Principiante', '2025-03-30 18:23:30', '2025-04-18 21:03:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `progresos`
--

CREATE TABLE IF NOT EXISTS `progresos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_plan` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `peso` decimal(5,2) DEFAULT NULL,
  `IMC` decimal(6,2) NOT NULL,
  `indice_grasa` decimal(10,0) NOT NULL,
  `observaciones` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_plan` (`id_plan`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `progresos`
--

TRUNCATE TABLE `progresos`;
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `usuarios`
--

TRUNCATE TABLE `usuarios`;
--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellidos`, `email`, `password`, `altura`, `peso`, `edad`, `sexo`, `rol`) VALUES
(15, 'Juan', 'Pérez', 'j@j.jj', '$2b$12$axvu4aHe/n4EKK42aT6GReqTzxLolC3hcvgSNRPGCT0ffwtGprN3G', 1.75, 70, 30, 'Hombre', 'USUARIO'),
(16, 'Marí', 'Gómez', 'a@a.a', '$2b$12$TM/P2R.NWUDnUfYWwG21eOoRKfmScUNh6MrzQMeSIziawaqF7WFpS', 1.5, 42, 31, 'Mujer', 'ENTRENADOR'),
(20, 'Antonio', 'Martínez', 'email@email.com', '$2b$12$MV/DBoF1pHdu/LRRD.2XF.wHP1W9hmUz.QUW52vF2uAUMMTAqB1ge', 1.7, 63, 36, 'Hombre', 'ADMIN');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalles_plan`
--
ALTER TABLE `detalles_plan`
  ADD CONSTRAINT `detalles_plan_ibfk_1` FOREIGN KEY (`id_plan`) REFERENCES `planes_entrenamiento` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `detalles_plan_ibfk_2` FOREIGN KEY (`id_ejercicio`) REFERENCES `ejercicios` (`id`) ON DELETE CASCADE;

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
