class User < ActiveRecord::Base
  attr_accessible :email, :fname, :lname, :password
  attr_reader :password

  validates :email, :fname, :lname, :session_token, :presence => true
  validates :password_digest, :presence => { :message => "Password cannot be blank"}
  validates :password, :length => { :minimum => 6, :allow_nil => true }

  before_validation :ensure_session_token

  has_many :boards
  has_many :boards_pins, :through => :boards, :source => :boards_pins
  has_many :pins, :through => :boards, :source => :pins

  def self.find_by_credentials(params)
    user = User.find_by_email(params[:email])
    return nil if user.nil?
    user.is_password?(params[:password]) ? user : nil
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
  end

  private
  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end
end
