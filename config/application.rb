require_relative 'boot'

require 'rails/all'
Bundler.require(*Rails.groups)

module PlatanusStats
  class Application < Rails::Application
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'
        resource '*',
          headers: :any,
          expose: ['X-Page', 'X-PageTotal'],
          methods: [:get, :post, :delete, :put, :options]
      end
    end
    config.i18n.default_locale = 'es-CL'
    config.i18n.fallbacks = [:es, :en]

    config.active_job.queue_adapter = :delayed_job
    config.assets.paths << Rails.root.join('vendor', 'assets', 'bower_components')

    config.autoload_paths << "#{Rails.root}/app/services"

    config.action_mailer.delivery_method = :smtp
    config.action_mailer.smtp_settings = {
      address: 'smtp.sendgrid.net',
      port: 587,
      domain: 'platan.us',
      user_name: 'apikey',
      password: ENV['SENDGRID_API_KEY']
    }
  end
end
