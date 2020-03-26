import { Injectable } from '@angular/core';

@Injectable()
export class NgxInokPlayerService {
  private audioList: {[s: string]: HTMLMediaElement[]} = {};

  addAudio(group: string, audio: HTMLMediaElement) {
    if (!this.hasGroup(group)) {
      this.audioList[group] = [];
    }
    this.audioList[group].push(audio);
  }

  switchAudio(group: string) {
    if (!this.hasGroup(group)) {
      return;
    }
    this.audioList[group]
      .filter((audio: HTMLMediaElement) => !audio.paused)
      .forEach((audio: HTMLMediaElement) => audio.pause());
  }

  removeAudio(group: string, audio: HTMLMediaElement) {
    if (!this.hasGroup(group)) {
      return;
    }
    this.audioList[group].splice(this.audioList[group].indexOf(audio), 1);
    this.removeGroup(group);
  }

  private hasGroup(group: string) {
    return this.audioList.hasOwnProperty(group);
  }

  private removeGroup(group: string) {
    if (!this.audioList[group].length) {
      delete this.audioList[group];
    }
  }
}
