<?php
function validateRequired($fields) {
  $input = getJsonInput();
  foreach ($fields as $field) {
    if (empty($input[$field]) && $input[$field] !== '0') {
      jsonError("$field is required");
    }
  }
  return $input;
}

function validateEmail($email) {
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    jsonError('Valid email is required');
  }
}

function sanitizeInput($data) {
  if (is_array($data)) {
    foreach ($data as $k => $v) {
      if (str_starts_with($k, '$') || str_contains($k, '.')) unset($data[$k]);
      else $data[$k] = sanitizeInput($v);
    }
  }
  return $data;
}

function getLocalizedField($row, $field, $locale = 'en') {
  $key = "{$field}_{$locale}";
  if (isset($row[$key])) return $row[$key];
  return $row["{$field}_en"] ?? '';
}

function buildLocalizedObject($row, $prefixes) {
  $obj = [];
  foreach ($prefixes as $prefix) {
    $obj[$prefix] = [
      'en' => $row["{$prefix}_en"] ?? '',
      'ar' => $row["{$prefix}_ar"] ?? '',
      'tr' => $row["{$prefix}_tr"] ?? '',
    ];
  }
  return $obj;
}
