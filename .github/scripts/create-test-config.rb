#!/usr/bin/env ruby

require 'json'

config = { os: ["ubuntu-latest", "windows-latest", "macos-latest"] }
File.open("config.json", "w") { |file|
    file.write(config.to_json)
}
