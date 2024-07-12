require 'loofah'

class CustomScrubber < Loofah::Scrubber

  def scrub(node)
    if node.name == 'span'
      allowed_classes = ['hr']

      # Check if the span tag has any allowed class
      if (node['class'].to_s.split(' ') & allowed_classes).any?
        return Loofah::Scrubber::CONTINUE
      else
        node.remove
        return Loofah::Scrubber::STOP
      end
    end

    return Loofah::Scrubber::CONTINUE
  end
end
