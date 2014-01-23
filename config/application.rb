require File.expand_path('../boot', __FILE__)

require 'rails/all'

if defined?(Bundler)
  # If you precompile assets before deploying to production, use this line
  Bundler.require(*Rails.groups(:assets => %w(development test)))
  # If you want your assets lazily compiled in production, use this line
  # Bundler.require(:default, :assets, Rails.env)
end

module PinterestClone
  class Application < Rails::Application

    config.encoding = "utf-8"

    config.filter_parameters += [:password]

    config.active_support.escape_html_entities_in_json = true

    config.active_record.whitelist_attributes = true

    # Enable the asset pipeline
    config.assets.enabled = true
    config.assets.initialize_on_precompile = false

    config.assets.version = '1.0'

    config.filepicker_rails.api_key = ENV["FILEPICKER_API_KEY"]
    config.filepicker_rails.secret_key = ENV["FILEPICKER_SECRET_KEY"]

  end
end
