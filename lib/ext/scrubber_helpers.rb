require 'loofah'

class CustomScrubber < Loofah::Scrubber

  def scrub(node)
    if node.name == 'span'
      allowed_classes = ['allowed-class1']

      # Check if the span tag has any allowed class
      unless (node['class'].to_s.split(' ') & allowed_classes).any?
        node.remove
        return Loofah::Scrubber::STOP
      end
    end

    return CONTINUE
  end
end
