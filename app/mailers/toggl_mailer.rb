class TogglMailer < ApplicationMailer
  def yesterday_stats(stats, date)
    @stats = stats
    mail(to: 'founders@platan.us', subject: "Toggl de Ayer #{date}")
  end
end
