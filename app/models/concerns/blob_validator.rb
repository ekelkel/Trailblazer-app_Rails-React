class BlobValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, values)
    return unless values.attached?

    Array(values).each do |value|
      if options[:max_size].present?
        if options[:max_size] < value.blob.byte_size
          record.errors.add(
            attribute,
            :max_size_error,
            max_size:
              ActiveSupport::NumberHelper.number_to_human_size(
                options[:max_size],
              ),
          )
        end
      end

      unless valid_content_type?(value.blob)
        record.errors.add(attribute, :content_type)
      end
    end
  end

  private

  def valid_content_type?(blob)
    return true if options[:content_type].nil?

    case options[:content_type]
    when Regexp
      options[:content_type].match?(blob.content_type)
    when Array
      options[:content_type].include?(blob.content_type)
    when Symbol
      blob.public_send("#{options[:content_type]}?")
    else
      options[:content_type] == blob.content_type
    end
  end
end
