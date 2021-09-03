# react-pickers

> A feature rich colour and gradient picker made in React

[![NPM](https://img.shields.io/npm/v/@dexterhill0/react-pickers.svg)](https://www.npmjs.com/package/@dexterhill0/react-pickers) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Demo

\<gif>

[Live Demo]()

## Install

```bash
npm install --save @dexterhill0/react-pickers
```

## Usage

```tsx
import React from "react";

import { ReactColour, ReactGradient } from "@dexterhill0/react-pickers";

const Pickers: React.FC = () => {
    return (
		<div>
        	<ReactColour></ReactColour>
		 	<ReactGradient></ReactGradient>
		</div>
    )
}
```
*More examples can be found [here]()*

## Options



## Known Bugs:

# Notes
* FireFox has not implemented writing to clipboard, so I have implemented a workaround using local storage. That comes with the downside that you can only copy and paste colours if the sites are of the same origin. For example, you can copy/paste between two tabs that have \<link> open, but not between a tab with \<link> and a tab with `google.com`


## License

MIT © [DexterHill0](https://github.com/DexterHill0)
