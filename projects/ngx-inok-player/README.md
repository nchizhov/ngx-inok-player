## Installation
```bash
npm i ngx-inok-player --save
```

## Documentation

### Dependencies

- [`file-saver`](https://www.npmjs.com/package/file-saver)

### Inputs (Properties)

-  `file` (`string` | `File` | `Function`) - Source of audio-file
-  `fileName` (`?string`) - Set filename for download audio-file (If not set, try parse from `file`)
-  `autoplay` (`?boolean`) - Autoplay of audio-file (default: `false`)
-  `loop` (`?boolean`) - Auto loop of audio-file (default: `false`)
-  `preload` (`?'auto' | 'metadata' | 'none'`) - Preloading of audio-file (default: `none`)
-  `group` (`?string`) - Group of audio-files for pause, if selected another file of group with this name (default: `default`)
-  `onError` (`?function`) - Function, that will be executed if catch error for playing audio-file (default: `empty function`)

### Example

```html
<ngx-inok-player src="assets/1.mp3"
                 group="audio_records" 
                 [onError]="onError"></ngx-inok-player>
<ngx-inok-player src="assets/2.mp3"
                 group="audio_records" 
                 [onError]="onError"></ngx-inok-player>
```

### License

The MIT License
