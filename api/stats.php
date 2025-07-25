<?php
header('Content-Type: application/json');
require_once '../db.php';

$stats = $pdo->query("
    SELECT 
      SUM(TIME_TO_SEC(TIMEDIFF(end_time, start_time))/3600 - TIME_TO_SEC(TIMEDIFF(lunch_end, lunch_start))/3600) AS total_hours,
      SUM((TIME_TO_SEC(TIMEDIFF(end_time, start_time))/3600 - TIME_TO_SEC(TIMEDIFF(lunch_end, lunch_start))/3600) * pay_rate) AS total_pay,
      MAX(pay_rate) AS current_rate
    FROM timesheet
")->fetch();

$paydays = $pdo->query("SELECT SUM(amount) as total_paid FROM paydays")->fetch();

echo json_encode([
  'total_hours' => round($stats['total_hours'], 2),
  'total_pay' => round($stats['total_pay'], 2),
  'current_rate' => round($stats['current_rate'], 2),
  'total_paid' => round($paydays['total_paid'], 2),
  'outstanding' => round($stats['total_pay'] - $paydays['total_paid'], 2)
]);
