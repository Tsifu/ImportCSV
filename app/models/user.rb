class User < ApplicationRecord

  def self.import(file)
    CSV.foreach(file.path, skip_blanks: true, skip_lines: /^(?:,\s*)+$/, headers: true) do |row|
      User.create row.to_hash
    end
  end

  def self.to_csv(options = {})
    CSV.generate(options) do |csv|
      csv << column_names
      all.each do |product|
        csv << product.attributes.values_at(*column_names)
      end
    end
  end
end
