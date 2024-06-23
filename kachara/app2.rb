require 'sinatra'
require 'mongo'
require 'dotenv/load'

# Enable sessions
enable :sessions
# Set up MongoDB connection
mongo_client = Mongo::Client.new(ENV['MONGO_URI'])

# Routes

# Home route
get '/' do
  erb :index
end

# Route to render the form for adding a new blog
get '/new_blog' do
  erb :new_blog
end

# Route to handle form submission and save data to MongoDB
post '/new_blog' do
    # Extract data from the form submission
    title = params['title']
    content = params['content']
  
    # Access the MongoDB collection (assuming 'blogs' is the collection name)
    blogs_collection = mongo_client[:blogs]
  
    # Insert the data into MongoDB
    result = blogs_collection.insert_one({ title: title, content: content })
  
    if result.inserted_id
      # Store the inserted blog ID in session
      session[:blog_id] = result.inserted_id
      redirect '/success' # Redirect to the success page
    else
      redirect '/error' # Redirect to an error page if insertion fails
    end
  end
  

# Route to the success page
get '/success' do
  erb :success
end

# Route for the view page
get '/view' do
    # Access the blog ID from session
    blog_id = session[:blog_id]
  
    if blog_id && BSON::ObjectId.legal?(blog_id)
      # Access the MongoDB collection (assuming 'blogs' is the collection name)
      blogs_collection = mongo_client[:blogs]
  
      # Fetch the blog by ID from MongoDB
      @blog = blogs_collection.find({ _id: BSON::ObjectId.from_string(blog_id) }).first
  
      if @blog
        # Print the blog data to the terminal for debugging
        puts "Blog ID: #{@blog['_id']}"
        puts "Title: #{@blog['title']}"
        puts "Content: #{@blog['content']}"
        erb :view
      else
        redirect '/error' # Redirect to an error page if blog not found
      end
    else
      redirect '/error' # Redirect to an error page if invalid blog ID
    end
  end
  
  # Route to view all recent articles
get '/recent_articles' do
  # Access the MongoDB collection (assuming 'blogs' is the collection name)
  blogs_collection = mongo_client[:blogs]

  # Fetch all blogs from MongoDB
  @blogs = blogs_collection.find.to_a

  erb :recent_articles, locals: { blogs: @blogs }
end

# Route for the error page
get '/error' do
  'An error occurred while adding the blog.'
end
