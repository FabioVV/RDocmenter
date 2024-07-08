
# load custom markdown editor tag
Dir["#{Rails.root}/lib/ext/*"].each { |path| require "ext/#{File.basename(path)}" }
