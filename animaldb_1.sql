CREATE TABLE IF NOT EXISTS `surveyresults` (
  `id` int(11) NOT NULL,
  `surveyoption` varchar(20) NOT NULL,
  `votes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `surveyresults`
--

INSERT INTO `surveyresults` (`id`, `surveyoption`, `votes`) VALUES
(1, 'Dog', 9),
(2, 'Cat', 8),
(3, 'Bird', 15),
(4, 'Snake', 4),
(5, 'None', 9);
