def set_error(error_message)
  session[:error] = error_message
end

def display_error
  error = session[:error]
  session[:error] = nil
  error
end
