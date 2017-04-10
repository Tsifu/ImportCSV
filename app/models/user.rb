class User < ApplicationRecord
  require 'csv'

  def self.import
    CSV.foreach(file.path, headers: true) do |row|
      User.create! row.to_hash
    end
  end
end
