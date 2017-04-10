class User < ApplicationRecord
  require 'csv'

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      debugger
      User.create! row.to_hash
    end
  end
end
