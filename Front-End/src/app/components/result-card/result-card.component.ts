import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export function getNoteName(key: number): string {
  const notes = [
    'C',
    'C♯',
    'D',
    'D♯',
    'E',
    'F',
    'F♯',
    'G',
    'G♯',
    'A',
    'A♯',
    'B',
  ];
  if (key >= 0 && key <= 11) {
    return notes[key];
  } else {
    return 'Key not found';
  }
}

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.css'],
})
export class ResultCardComponent implements OnInit {
  @Input() trackData: any; // For track information
  @Input() analysisData: any; // For analysis information
  @Output() trackSelected = new EventEmitter<string>();

  selectTrack(trackId: string) {
    this.trackSelected.emit(trackId);
  }

  constructor() {}

  ngOnInit(): void {}

  getNoteDisplayName(noteValue: number): string {
    return getNoteName(noteValue);
  }
}
