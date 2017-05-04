class TogglService < PowerTypes::Service.new(api_token: ENV["TOGGL_API_TOKEN"],
                                             workspace_id: ENV["WORKSPACE_ID"])
  URL = 'https://toggl.com/reports/api/v2/summary'

  def total_time_by_user(data_since, date_until)
    response = perform_query(grouping: 'users', since: data_since, until: date_until)

    response["data"].map { |data| [data['title']['user'], data['time'] / 3600000.to_f] }
  end

  private

  def perform_query(options)
    HTTParty.get(URL, http_party_options(options))
  end

  def http_party_options(options)
    {
      query: query_param(options),
      basic_auth: auth
    }
  end

  def query_param(options)
    { workspace_id: @workspace_id, user_agent: 'platanus-stats' }.merge(options)
  end

  def auth
    {
      username: @api_token,
      password: 'api_token'
    }
  end
end
