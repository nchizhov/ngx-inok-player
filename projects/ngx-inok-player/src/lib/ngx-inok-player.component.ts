import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { saveAs } from 'file-saver';

import {NgxInokPlayerService} from './ngx-inok-player.service';

@Component({
  selector: 'ngx-inok-player',
  templateUrl: './ngx-inok-player.component.html',
  styleUrls: ['./ngx-inok-player.component.less']
})
export class NgxInokPlayerComponent implements OnInit, OnDestroy {
  @Input() file: string | File | Function;
  @Input() fileName: string;
  @Input() autoplay = false;
  @Input() loop = false;
  @Input() preload: 'auto' | 'metadata' | 'none' = 'metadata';
  @Input() group = 'default';
  @Input() onError: Function = (() => {});

  audio: HTMLMediaElement = null;
  audioExists = false;
  audioError = false;
  duration = null;
  currentTime = null;

  rangeProgressValue = 0;
  private muteVolume = 1.0;
  private audioSrcInit = false;
  private downloadFileName = '';

  constructor(private playerService: NgxInokPlayerService) {}

  ngOnInit() {
    this.audioBuild();
  }

  ngOnDestroy(): void {
    if (!this.audioError) {
       this.playerService.removeAudio(this.group, this.audio);
    }
    this.audioDestroy();
  }

  onPlayPause() {
    if (this.audioError) {
      return;
    }
    this.audioSrc();
    if (this.audio.paused) {
      this.playerService.switchAudio(this.group);
      this.audio.play().then(() => {
        this.audioExists = true;
      }).catch(this.playError.bind(this));
    } else {
      this.audio.pause();
    }
  }

  onProgress() {
    this.audio.currentTime = Math.floor(this.duration / 100 * this.rangeProgressValue);
  }

  onMute() {
    if (this.audio.volume) {
      this.muteVolume = this.audio.volume;
      this.audio.volume = 0;
    } else {
      this.audio.volume = this.muteVolume;
    }
  }

  onDownload() {
    if (this.audioError) {
      saveAs(this.audio.currentSrc);
      return;
    }
    if (this.audioSrcInit) {
      saveAs(this.audio.currentSrc);
      return;
    }
    this.audioSrc();
    this.audio.play().then(() => {
      this.audioExists = true;
      this.audio.pause();
      saveAs(this.audio.currentSrc, this.downloadFileName);
    }).catch(this.playError.bind(this));
  }

  private audioBuild() {
    this.audio = new Audio();
    this.audio.autoplay = this.autoplay;
    this.audio.loop = this.loop;
    this.audio.preload = this.preload;
    this.audio.ontimeupdate = () => {
      if (!this.audioExists) {
        return;
      }
      this.currentTime = this.audio.currentTime;
      if (!this.duration) {
        this.duration = this.audio.duration;
      }
      this.rangeProgressValue = this.currentTime / this.duration * 100;
    };
  }

  private audioSrc() {
    if (this.audioSrcInit) {
      return;
    }
    if (typeof this.file === 'string') {
      this.downloadFileName = this.file.substring(this.file.lastIndexOf('/') + 1);
      this.audio.src = <string>this.file;
    } else {
      let file: any = null;
      if (this.file instanceof Function) {
        file = this.file();
      } else if (this.file instanceof File) {
        file = this.file;
      }
      if (file !== null && file instanceof File) {
        this.downloadFileName = file.name;
        this.audio.src = window.URL.createObjectURL(file);
      }
    }
    if (this.fileName) {
      this.downloadFileName = this.fileName;
    }
    this.playerService.addAudio(this.group, this.audio);
    this.audioSrcInit = true;
  }

  private audioDestroy() {
    window.URL.revokeObjectURL(this.audio.currentSrc);
    this.audio.ontimeupdate = null;
    this.audio.src = '';
    this.audio = null;
  }

  private playError() {
    this.audioExists = false;
    this.audioError = true;
    this.duration = 0;
    this.audio.pause();
    this.playerService.removeAudio(this.group, this.audio);
    this.onError();
  }
}
