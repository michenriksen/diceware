map "/" do
  use Rack::Static, urls: ["/assets"], root: Dir.pwd

  run lambda { |env|
    headers = {
      "Content-Type"              => "text/html; charset=utf-8",
      "Cache-Control"             => "private, max-age=0, must-revalidate",
      "Strict-Transport-Security" => "max-age=16070400",
      "X-Frame-Options"           => "SAMEORIGIN",
      "X-Content-Type-Options"    => "nosniff",
      "X-XSS-Protection"          => "1; mode=block",
      "Content-Security-Policy"   => "default-src 'none'; script-src 'self' code.jquery.com netdna.bootstrapcdn.com; style-src 'self' 'unsafe-inline' netdna.bootstrapcdn.com; font-src netdna.bootstrapcdn.com",
      "X-Content-Security-Policy" => "default-src 'none'; script-src 'self' code.jquery.com netdna.bootstrapcdn.com; style-src 'self' 'unsafe-inline' netdna.bootstrapcdn.com; font-src netdna.bootstrapcdn.com",
      "X-WebKit-CSP"              => "default-src 'none'; script-src 'self' code.jquery.com netdna.bootstrapcdn.com; style-src 'self' 'unsafe-inline' netdna.bootstrapcdn.com; font-src netdna.bootstrapcdn.com"
    }

    body = File.open("#{Dir.pwd}/index.html", File::RDONLY).read

    [200, headers, [body]]
  }
end
