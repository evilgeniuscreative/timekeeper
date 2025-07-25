<?php
require_once '../db.php';

header('Content-Type: text/csv');
header('Content-Disposition: attachment;filename="time_entries.csv"');

$output = fopen('php://output', 'w');

// Header row
fputcsv($output, ['Date', 'Start Time', 'Lunch Start', 'Lunch End', 'End Time', 'Hours Worked', 'Pay']);

// Data rows
$query = $pdo->query("
  SELECT 
    date, start_time, lunch_start, lunch_end, end_time,
    (TIME_TO_SEC(TIMEDIFF(end_time, start_time))/3600 - TIME_TO_SEC(TIMEDIFF(lunch_end, lunch_start))/3600) AS hours,
    ((TIME_TO_SEC(TIMEDIFF(end_time, start_time))/3600 - TIME_TO_SEC(TIMEDIFF(lunch_end, lunch_start))/3600) * pay_rate) AS pay
  FROM timesheet
  ORDER BY date DESC
");

while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
  fputcsv($output, [
    $row['date'],
    $row['start_time'],
    $row['lunch_start'],
    $row['lunch_end'],
    $row['end_time'],
    number_format($row['hours'], 2),
    number_format($row['pay'], 2)
  ]);
}

fclose($output);
exit;
