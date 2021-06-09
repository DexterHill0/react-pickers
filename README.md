# react-pickers

> A feature rich colour and gradient picker made in React

[![NPM](https://img.shields.io/npm/v/@dexterhill0/react-pickers.svg)](https://www.npmjs.com/package/@dexterhill0/react-pickers) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Demo

\<gif>

[Live Demo]()

## Install

```bash
npm install --save react-pickers
```

## Usage

```tsx
import React, { Component } from "react"

import { ReactColour, ReactGradient } from "react-pickers";

class Example extends Component {
  render() {
    return (
        <div>
            <ReactColour />
            <ReactGradient />
        </div>
    );
  }
}
```
*More examples can be found [here]()*

## Options



## Known Bugs:

# Notes
* FireFox has not implemented reading from clipboard, so copy-pasting colours will *not* work.


## License

MIT © [DexterHill0](https://github.com/DexterHill0)
