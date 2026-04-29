export default function Container({ children, className = '', bg = 'bg-gray-100' }) {
  return (
    <div className={`container mx-auto p-8 rounded-xl shadow-md ${bg} ${className}`}>
      {children}
    </div>
  )
}