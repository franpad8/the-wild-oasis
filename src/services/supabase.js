import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://lyjhypyegcyjrmeghiyv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5amh5cHllZ2N5anJtZWdoaXl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMxMjU2OTQsImV4cCI6MjAxODcwMTY5NH0.y37hbR02GDs3Z_JxVQlJ1WZ8cvuuk7xPtWnNkXRquFg'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
