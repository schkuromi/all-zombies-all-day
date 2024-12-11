# All Zombies All Day
## SPT 3.10+ ONLY

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

| [Features](#features) | [Config Options](#config-options) | [Mod Compatibility](#mod-compatibility) |
|---|---|---|

## Features
- Ability to change Halloween event timings
- Ability to change Infection percentages per map
- Ability to turn off PMCs/Bosses from spawning
- Ability to keep the normal Bot hostility settings

## Config Options
Comments added for explanation, they are not in the actual file other than "Maps" and "DisableBosses".
```json
{
    "enabled": true, // allows you to turn off the mod without uninstalling it. default: true
    "debug": false, // lines for debugging. shows on the server console. default: false

    "time": { 
        "startDay": 1, // default: 1
        "startMonth": 1, // default: 1
        "endDay": 32, // default: 32
        "endMonth": 12 // default: 12
    }, // controls the start and end timing for the halloween event in SPT

    "replaceBotHostility": true, // if true, similar to Live event where it makes bosses friendly. false is normal tarkov. default: true
    
    "maps": {
        "comment": "Percentage of Scavs that are changed to Zombies. Set number between 0 and 100, you can go above 100 but I don't what the consequences are.",
        "Labs": 100,
        "Customs": 100,
        "Factory": 100,
        "Interchange": 100,
        "Lighthouse": 100,
        "Reserve": 100,
        "GroundZero": 100,
        "Shoreline": 100,
        "StreetsOfTarkov": 100,
        "Woods": 100
    },

    "disablebosses": {
        "comment": "When set to true, disables PMCs and Bosses from spawning. DOES NOT AFFECT SCAVS",
        "Labs": true,
        "Customs": false,
        "Factory": false,
        "Interchange": false,
        "Lighthouse": false,
        "Reserve": false,
        "GroundZero": false,
        "Shoreline": false,
        "StreetsOfTarkov": false,
        "Woods": false
    }
}
```

## Mod Compatibility
### Compatible
- Most mods should be compatible.
- If this mod isn't working, try putting it at the top of the load order.
### Not Compatible
- [MOAR](https://github.com/Andrewgdewar/MOAR) - The mod modifies the same things for its zombie features. Either use this mod **or** MOAR, not **both**.
