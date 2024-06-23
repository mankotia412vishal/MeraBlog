require 'sinatra'
require 'mongo'
require 'dotenv/load'
# Set up MongoDB connection
mongo_client = Mongo::Client.new(ENV['MONGO_URI'])

# Routes
get '/' do
  erb :index
end

# Define a route to render the form
get '/new_blog' do
  erb :new_blog
end

# Define a route to handle form submission and save data to MongoDB
post '/new_blog' do
  # Extract data from the form submission
  title = params['title']
  content = params['content']

  # Access the MongoDB collection (assuming 'blogs' is the collection name)
  blogs_collection = mongo_client[:blogs]

  # Insert the data into MongoDB
  result = blogs_collection.insert_one({ title: title, content: content })

  if result.inserted_id
    redirect '/success' # Redirect to a success page
  else
    redirect '/error' # Redirect to an error page if insertion fails
  end
end

# Define a route for the success page
get '/success' do
  'Blog added successfully!'
end

# Define a route for the error page
get '/error' do
  'An error occurred while adding the blog.'
end
