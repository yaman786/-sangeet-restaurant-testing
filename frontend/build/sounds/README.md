# Notification Sounds

This directory contains notification sound files for the real-time order system.

## Required Files

- `notification.mp3` - Sound played when a new order is received
- `completion.mp3` - Sound played when an order is ready or completed

## How to Add Sounds

1. Place your MP3 files in this directory
2. Name them exactly as shown above
3. Keep file sizes small (under 100KB) for fast loading
4. Use short sounds (1-3 seconds) for better user experience

## Default Behavior

If sound files are not found, the system will silently continue without playing sounds. This prevents errors and allows the notification system to work without audio files.

## Browser Compatibility

- Modern browsers support MP3 playback
- Some browsers require user interaction before playing audio
- Mobile browsers may have additional restrictions 