# switchim README

SwitchIm is used for providing a vscode command to switch input method on MacOS. The main purpose is to make a workaround to [disable input method when exiting intert mode](https://github.com/VSCodeVim/Vim/issues/935) when using vim extension.

Say you want to switch to English input method when you leave insert mode, you can add the following vim plugin configuration:

```json
    "vim.insertModeKeyBindings": [
        {
            "before": [
                "j",
                "j"
            ],
            "after": [
                "<Esc>"
            ],
            "commands": [
                {
                    "command": "switchim.use",
                    "args": ["com.apple.keyboardlayout.all"]
                }
            ]
        }
    ],
```

With this configuration, the switch input method command will fire when you type jj to leave insert mode. The argument require an input method ID, see the following section for how to get it.

## swim

I don't know how to change input method by using JS inside vscode directly. To switch input method, this plugin uses a command line tool named [swim](https://github.com/mitsuse/swim). You must download this repository and build the swim binary to make this plugin work. Please following the "Installation" section of swim project.

You could add swim binary to your $PATH, or you need to add the path of swim binary in the configuration like below:

```json
    "switchim.swimPath": "/Users/xxx/swift/swim/.build/release/swim"
```

## Input Method IDs

To get input method IDs, you could run `swim list`, which presents the following output:

```
com.apple.keyboardlayout.all
com.apple.inputmethod.SCIM
```

You could supply '--name' to get input method name, which presents:

```
U.S. (com.apple.keyboardlayout.all)
Pinyin - Simplified (com.apple.inputmethod.SCIM)
```

We normally want "com.apple.keyboardlayout.all" to be added in vscode vim plugin configuration above.

## Requirements

You must have swim installed, check above sections for how to.

## Extension Settings

This plugin has a configuration item for setting swim binary path. You could ignore this if you have added swim binary in your PATH.

## Release Notes


### 1.0.0

Initial release

**Enjoy!**