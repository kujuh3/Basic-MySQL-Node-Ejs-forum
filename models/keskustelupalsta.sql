-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 20, 2021 at 12:52 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `keskustelupalsta`
--

-- --------------------------------------------------------

--
-- Table structure for table `keskustelut`
--

CREATE TABLE `keskustelut` (
  `id` int(11) NOT NULL,
  `otsikko` text NOT NULL,
  `sisalto` text NOT NULL,
  `kirjoittaja` text NOT NULL DEFAULT '\'Anonyymi\'',
  `aikaleima` datetime NOT NULL,
  `viimeisin` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `keskustelut`
--

INSERT INTO `keskustelut` (`id`, `otsikko`, `sisalto`, `kirjoittaja`, `aikaleima`, `viimeisin`) VALUES
(1, 'Testi otsikko', '<p>Testi sis&auml;lt&ouml;</p><ul><li>T&auml;&auml;ll&auml; on my&ouml;s muotoiluja<ul><li>ja sisennyksi&auml;</li></ul></li></ul>', 'Joonas', '2021-10-14 02:44:08', '2021-10-20 01:12:27'),
(2, 'Invoker', '<ul><li>Did<ul><li>I<ul><li>Hear<ul><li>A<ul><li>Squeak</li></ul></li></ul></li></ul></li></ul></li></ul>', 'Topson', '2021-10-14 02:49:22', '2021-10-20 01:13:37'),
(3, 'Kela', '<p>Mets&auml;tie</p>', 'Anssi', '2021-10-14 03:01:47', '2021-10-20 01:31:09');

-- --------------------------------------------------------

--
-- Table structure for table `viestit`
--

CREATE TABLE `viestit` (
  `id` int(11) NOT NULL,
  `keskusteluid` int(11) NOT NULL,
  `viesti` text NOT NULL,
  `nimimerkki` text NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `viestit`
--

INSERT INTO `viestit` (`id`, `keskusteluid`, `viesti`, `nimimerkki`, `date`) VALUES
(1, 1, '<p>Testi kommentti</p>', 'Anssi', '2021-10-20 11:12:27'),
(2, 2, '<p>Kommentti kommentti</p>', 'Kommentoija', '2021-10-20 01:13:37'),
(3, 3, '<p>Nice</p><ul><li>Nice<ul><li>Nice<ul><li>Nice<ul><li>Nice<ul><li>Nice<ul><li>Nice</li></ul></li></ul></li></ul></li></ul></li></ul></li></ul>', 'Nice', '2021-10-20 12:27:47'),
(4, 3, '<p>Kommentoija kommentoi</p>', 'Kommentoija v2', '2021-10-20 12:30:29'),
(5, 3, '<p>Tosi kiva</p>', 'Peter', '2021-10-20 14:31:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `keskustelut`
--
ALTER TABLE `keskustelut`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `viestit`
--
ALTER TABLE `viestit`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `keskustelut`
--
ALTER TABLE `keskustelut`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `viestit`
--
ALTER TABLE `viestit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
