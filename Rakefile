require "rubygems"
require "stringex"

if (/cygwin|mswin|mingw|bccwin|wince|emx/ =~ RUBY_PLATFORM) != nil
  puts '## Set the codepage to 65001 for Windows machines'
  `chcp 65001`
end


desc "preview the site in a web browser"
task :serve do

  puts "Starting to watch source with octopress and Grunt "

  jekyllPid = Process.spawn("jekyll serve --config _config.yml,_config_local.yml --watch &")
  gruntPid = Process.spawn("grunt watch &")

  #rackupPid = Process.spawn("rackup --port #{server_port}")

  trap("INT") {
    [jekyllPid, gruntPid].each {
		|pid| puts "PID: #{pid}"
		Process.kill(9, pid) rescue Errno::ESRCH
	}

    exit 0
  }

  [jekyllPid, gruntPid].each {
	|pid| Process.wait(pid)
	puts "PID: #{pid}"
  }
end