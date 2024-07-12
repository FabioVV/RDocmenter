
# load custom markdown editor tag and our scrubber
Dir["#{Rails.root}/lib/ext/*"].each { |path| require "ext/#{File.basename(path)}" }
