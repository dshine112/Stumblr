get '/login' do
  erb :'user/login'
end

post '/login' do
  user = User.find_by(username: params[:user][:username]).try(:authenticate, params[:user][:password])
  if user
    session[:user_id] = user.id
    redirect "/"
  else
    set_error('Login failed')
    redirect '/login'
  end
end

get '/signup' do
  erb :'user/signup'
end

post '/signup' do
  user = User.new(params[:user])
  if user.save
    session[:user_id] = user.id
    redirect "/"
  else
    redirect '/signup'
  end
end

get '/profile/:id' do |id|
  @user = User.find(id)
  if @user.id == session[:user_id]
    erb :'user/profile'
  else
    if session[:user_id]
      redirect '/'
    else
      redirect '/login'
    end
  end
end

get '/logout' do
  session[:user_id] = nil
  redirect '/'
end