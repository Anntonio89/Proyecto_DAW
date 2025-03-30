--
-- Base de datos: `daw_proyecto_gym_ant`
--
CREATE DATABASE IF NOT EXISTS `daw_proyecto_gym_ant` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `daw_proyecto_gym_ant`;

-- ----------------------------------------------------------

--
-- Estructura de tabla para la tabla `planes_entrenamiento`
--

CREATE TABLE IF NOT EXISTS `ejercicios` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `nombre` varchar(100) NOT NULL,
    `descripcion` TEXT NOT NULL,
    PRIMARY KEY (`id`)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- ----------------------------------------------------
--
-- Inserción de datos de prueba
--

INSERT INTO `ejercicios` (`nombre`, `descripcion`) VALUES
('Sentadillas', 'Ejercicio para fortalecer piernas y glúteos'),
('Press de banca', 'Ejercicio para pecho y tríceps'),
('Dominadas', 'Ejercicio para espalda y bíceps');

