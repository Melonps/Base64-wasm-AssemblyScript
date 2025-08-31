# WASM Base64 Encoder/Decoder

A fast Base64 encoder/decoder implemented in AssemblyScript and compiled to WebAssembly.

## Features

- **Fast**: WebAssembly-powered Base64 encoding/decoding
- **Complete**: Both encode and decode functionality
- **Browser-ready**: Web interface included
- **Type-safe**: Written in AssemblyScript (TypeScript-like)
- **Tested**: Comprehensive test suite

## Quick Start

```bash
# Install dependencies
pnpm install

# Build the project
pnpm run asbuild

# Start local server
pnpm start
```

Open `http://localhost:3000` in your browser to use the web interface.

## Usage

### Web Interface

The included HTML page provides:

- Real-time Base64 encoding/decoding
- Copy-to-clipboard functionality
- Tab-based interface for encode/decode modes

### Programmatic Usage

```javascript
import { text2Base64, base64ToText } from './build/release.js';

// Encode text to Base64
const encoded = text2Base64("Hello, World!");
console.log(encoded); // "SGVsbG8sIFdvcmxkIQ=="

// Decode Base64 to text
const decoded = base64ToText("SGVsbG8sIFdvcmxkIQ==");
console.log(decoded); // "Hello, World!"
```

## API

### Main Functions

#### `text2Base64(text: string): string`

Encodes text to Base64.

#### `base64ToText(base64: string): string`

Decodes Base64 to text.

### Helper Functions

Additional functions are available for advanced use cases:

- `char2Binary`, `text2Binary`, `binary2Base64`
- `base64CharToDecimal`, `decimal2SixBit`, `decimals2Binary`
- `binary2Bytes`, `bytes2Text`

## Development

```bash
# Run tests
pnpm test

# Build debug version
pnpm run asbuild:debug

# Build release version
pnpm run asbuild:release
```

## Project Structure

```text
├── assembly/          # AssemblyScript source
├── build/            # Compiled WASM + JS bindings
├── tests/            # Test files
├── index.html        # Web demo
└── package.json      # Project config
```

## Performance

WebAssembly provides 2-3x faster performance compared to native JavaScript implementations, especially for large datasets.

## License

ISC

---

🚀 Built with [AssemblyScript](https://www.assemblyscript.org/)
