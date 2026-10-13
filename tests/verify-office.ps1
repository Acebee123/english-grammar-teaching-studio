param([string]$ExportDir)
$ErrorActionPreference='Stop'
$base=(Resolve-Path -LiteralPath $ExportDir).Path
$result=@{}
$wordWasRunning=@(Get-Process WINWORD -ErrorAction SilentlyContinue).Count -gt 0
$pptWasRunning=@(Get-Process POWERPNT -ErrorAction SilentlyContinue).Count -gt 0
try {
 $word=New-Object -ComObject Word.Application
 $word.Visible=$false
 $word.DisplayAlerts=0
 foreach($mode in @('offline','static','stress')) {
  $doc=$word.Documents.Open((Join-Path $base "$mode.docx"),$false,$true)
  $result["$mode-word"]=@{paragraphs=$doc.Paragraphs.Count;pages=$doc.ComputeStatistics(2);editableTextLength=$doc.Content.Text.Length;opened=$true}
  $doc.ExportAsFixedFormat((Join-Path $base "$mode-word.pdf"),17)
  $doc.Close(0)
 }
} catch { $result['word-error']=$_.Exception.Message } finally { if($word -and -not $wordWasRunning){$word.Quit()} }
try {
 $ppt=New-Object -ComObject PowerPoint.Application
 foreach($mode in @('offline','static','stress')) {
  $deck=$ppt.Presentations.Open((Join-Path $base "$mode.pptx"),-1,0,0)
  $textShapes=0
  foreach($slide in $deck.Slides){foreach($shape in $slide.Shapes){if($shape.HasTextFrame -eq -1){$textShapes++}}}
  $result["$mode-powerpoint"]=@{slides=$deck.Slides.Count;textShapes=$textShapes;opened=$true}
  $imageDir=Join-Path $base "$mode-slides"
  New-Item -ItemType Directory -Force -Path $imageDir | Out-Null
  $deck.Export($imageDir,'PNG',1280,720)
  $deck.Close()
 }
} catch { $result['powerpoint-error']=$_.Exception.Message } finally { if($ppt -and -not $pptWasRunning){$ppt.Quit()} }
$result | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath (Join-Path $base 'office-results.json')
$result | ConvertTo-Json -Depth 10

