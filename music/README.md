# Music Folder

This folder contains audio files for the Bussi Baba website.

## How to Add Music

### 1. Supported Formats
- **MP3** (recommended) - `filename.mp3`
- **OGG** (alternative) - `filename.ogg`
- **WAV** (large files) - `filename.wav`

### 2. File Naming
Use descriptive names:
- `bussi-baba-mixtape.mp3`
- `deep-house-vibes.mp3`
- `techno-nights.mp3`

### 3. File Size
- Keep files under 10MB for web streaming
- Use 128kbps or 192kbps for good quality/size balance

### 4. Adding Your Music

1. **Place your audio files** in this folder
2. **Update the HTML** to reference your files:

```html
<audio id="audio-player" preload="metadata">
    <source src="music/your-file-name.mp3" type="audio/mpeg">
    <source src="music/your-file-name.ogg" type="audio/ogg">
</audio>
```

### 5. Sample Files
You can add these sample files for testing:
- `bussi-baba-mixtape.mp3` - Main mixtape
- `deep-house-vibes.mp3` - Deep house track
- `techno-nights.mp3` - Techno track

### 6. Legal Considerations
- Only use music you have rights to
- Consider royalty-free music
- Or use your own original music

## Alternative: External Music Services

Instead of hosting files, you can embed:
- **SoundCloud** widgets
- **Spotify** embeds
- **YouTube** music videos
- **Bandcamp** players
