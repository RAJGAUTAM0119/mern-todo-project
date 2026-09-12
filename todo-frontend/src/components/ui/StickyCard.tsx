import StickyForm from "../todo/stickyNotes/StickyForm"

const StickyCard = () => {

  const arr = [1, 2, 3, 29, 24, 23]


  return (
    <section>
      <div className='grid grid-cols-4 gap-5 row-auto border border-[#d4d4d1] p-5 rounded-3xl'>

        {
          arr.map((data) =>
            <div key={data} className='w-50 h-60 p-5 bg-[#FDF2B3] rounded-3xl flex flex-col gap-5'>
              <div>
                <h3 className='font-semibold text-[#25252B]'>hello world</h3>

              </div>
              <div className='flex flex-col text-xs font-semibold gap-2' >
                <div>
                  <span>-</span>
                  <span>Plan Social Content</span>
                </div>
                <div>
                  <span>-</span>
                  <span>Plan Build Content Calender</span>
                </div>

                <div>
                  <span>-</span>
                  <span>Plan Promotion and distribution</span>
                </div>
                <div>
                  <span>-</span>
                  <span>Plan Promotion and distribution</span>
                </div>
              </div>
            </div>
          )
        }
        <StickyForm />
      </div>
    </section >
  )
}

export default StickyCard