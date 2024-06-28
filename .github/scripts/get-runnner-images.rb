#!/usr/bin/env ruby

require 'json'

images = { os: ["ubuntu-latest", "windows-latest", "macos-latest"] }
File.open("config.json", "w") { |file|
    file.write(images.to_json)
}
