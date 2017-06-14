-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 11, 2017 at 05:19 PM
-- Server version: 5.7.11
-- PHP Version: 5.6.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `school-system`
--

-- --------------------------------------------------------

--
-- Table structure for table `administrator`
--

CREATE TABLE `administrator` (
  `id` int(11) NOT NULL,
  `admin_name` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `admin_role` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `admin_phone` int(15) NOT NULL,
  `admin_email` varchar(35) COLLATE utf8_unicode_ci NOT NULL,
  `admin_password` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `admin_image` varchar(200) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `administrator`
--

INSERT INTO `administrator` (`id`, `admin_name`, `admin_role`, `admin_phone`, `admin_email`, `admin_password`, `admin_image`) VALUES
(2, 'Lyle', 'owner', 12341234, 'lyle@gmail.com', '1234', 'http://www.www8-hp.com/us/en/images/agile_manager_videos_451x235_tcm245_2152330_tcm245_2152326_tcm245-2152330.jpg'),
(4, 'Sales', 'sales', 43211234, 'sales@gmail.com', '1234', 'http://www.www8-hp.com/us/en/images/agile_manager_videos_451x235_tcm245_2152330_tcm245_2152326_tcm245-2152330.jpg'),
(5, 'Manager', 'manager', 1, 'manager@gmail.com', '12345', 'https://upload.wikimedia.org/wikipedia/commons/0/07/Avatar_girl_face.png');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `cour_name` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `cour_description` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `cour_image` varchar(300) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `cour_name`, `cour_description`, `cour_image`) VALUES
(2, 'Math', 'Math Course', 'http://drivingbuddy.co.il/school/img/logo.png'),
(3, 'English', 'this is the english', 'http://drivingbuddy.co.il/school/img/logo.png'),
(10, 'Sport', 'This is the sports course', 'https://s-media-cache-ak0.pinimg.com/originals/83/90/0a/83900a5b6d403ddbfd4e843ea70828f4.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `cour_student`
--

CREATE TABLE `cour_student` (
  `id` int(11) NOT NULL,
  `stud_name` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `stud_phone` int(15) NOT NULL,
  `stud_email` varchar(35) COLLATE utf8_unicode_ci NOT NULL,
  `stud_image` varchar(200) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `cour_student`
--

INSERT INTO `cour_student` (`id`, `stud_name`, `stud_phone`, `stud_email`, `stud_image`) VALUES
(4, 'lyle', 1, 'lyle@gmail.com', 'http://www.www8-hp.com/us/en/images/agile_manager_videos_451x235_tcm245_2152330_tcm245_2152326_tcm245-2152330.jpg'),
(5, 'lyle', 2, 'lyle@gmail.com', 'http://www.www8-hp.com/us/en/images/agile_manager_videos_451x235_tcm245_2152330_tcm245_2152326_tcm245-2152330.jpg'),
(6, 'lyle', 3, 'lyle@gmail.com', 'http://www.www8-hp.com/us/en/images/agile_manager_videos_451x235_tcm245_2152330_tcm245_2152326_tcm245-2152330.jpg'),
(7, 'lyle', 4, 'lyle@gmail.com', 'http://www.www8-hp.com/us/en/images/agile_manager_videos_451x235_tcm245_2152330_tcm245_2152326_tcm245-2152330.jpg'),
(8, 'lyle', 5, 'lyle@gmail.com', 'http://www.www8-hp.com/us/en/images/agile_manager_videos_451x235_tcm245_2152330_tcm245_2152326_tcm245-2152330.jpg'),
(9, 'lyle', 6, 'lyle@gmail.com', 'http://www.www8-hp.com/us/en/images/agile_manager_videos_451x235_tcm245_2152330_tcm245_2152326_tcm245-2152330.jpg'),
(13, 'lyle', 7, 'lyle@gmail.com', 'http://www.www8-hp.com/us/en/images/agile_manager_videos_451x235_tcm245_2152330_tcm245_2152326_tcm245-2152330.jpg'),
(14, 'lyle', 8, 'lyle@gmail.com', 'http://www.www8-hp.com/us/en/images/agile_manager_videos_451x235_tcm245_2152330_tcm245_2152326_tcm245-2152330.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `student_course_junction`
--

CREATE TABLE `student_course_junction` (
  `student_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `student_course_junction`
--

INSERT INTO `student_course_junction` (`student_id`, `course_id`) VALUES
(4, 2),
(5, 2),
(9, 2),
(14, 2),
(4, 3),
(7, 3),
(14, 3),
(4, 10),
(5, 10),
(13, 10);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `administrator`
--
ALTER TABLE `administrator`
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `id_2` (`id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `cour_student`
--
ALTER TABLE `cour_student`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `id_2` (`id`);

--
-- Indexes for table `student_course_junction`
--
ALTER TABLE `student_course_junction`
  ADD PRIMARY KEY (`student_id`,`course_id`),
  ADD KEY `FK_course` (`course_id`),
  ADD KEY `FK_student` (`student_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `administrator`
--
ALTER TABLE `administrator`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `cour_student`
--
ALTER TABLE `cour_student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `student_course_junction`
--
ALTER TABLE `student_course_junction`
  ADD CONSTRAINT `FK_course` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_student` FOREIGN KEY (`student_id`) REFERENCES `cour_student` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
