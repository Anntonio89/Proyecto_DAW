--
-- Base de datos: `daw_proyecto_gym_ant`
--
CREATE DATABASE IF NOT EXISTS `daw_proyecto_gym_ant` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `daw_proyecto_gym_ant`;

-- ----------------------------------------------------------

--
-- Estructura de tabla para la tabla `planes_entrenamiento`
--

CREATE TABLE IF NOT EXISTS `planes_entrenamiento` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `id_entrenador` int(11) NOT NULL,
    `plan` varchar(100) NOT NULL,
    `nivel` ENUM('Principiante','Intermedio','Avanzado') NOT NULL,
    PRIMARY KEY (`id`),
    KEY `FK_PLAN` (`id_entrenador`),
    CONSTRAINT `FK_PLAN` FOREIGN KEY (`id_entrenador`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- ----------------------------------------------------
--
-- Inserción de datos de prueba
--

INSERT INTO `planes_entrenamiento` (`id_entrenador`, `plan`, `nivel`) VALUES
(2, 'Plan de Fuerza', 'Avanzado'),
(2, 'Plan de Resistencia', 'Intermedio'),
(2, 'Plan para Principiantes', 'Principiante');
