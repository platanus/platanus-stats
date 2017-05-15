# lib/tasks/emails/run.rake
namespace :emails do
  desc 'Emails tasks'
  task run: :environment do
    date = Date.yesterday

    srv = TogglService.new(api_token: ENV['TOGGL_API_TOKEN'],
                           workspace_id: ENV['TOGGL_WORKSPACE_ID'])

    stats = srv.total_time_by_user(date, date).sort! { |x, y| y[1] <=> x[1] }

    TogglMailer.yesterday_stats(stats, date).deliver_now
  end
end
